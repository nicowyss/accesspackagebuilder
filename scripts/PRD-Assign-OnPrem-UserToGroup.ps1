# This Script is a Runbook for Hybrid Worker to add Users to On-Premise Groups (LifecycleWorkflows is the trigger via Logic App)
param (
    [string]$UserPrincipalName  # UPN from Entra ID (e.g., user@domain.com)
)

# Import Active Directory module
Import-Module ActiveDirectory

# Retrieve stored credentials from Azure Automation
$Cred = Get-AutomationPSCredential -Name "DomainAdminCreds"
if (-not $Cred) {
    Write-Output "❌ ERROR: Failed to retrieve domain admin credentials."
    exit 2
}

# Define log file path (based on user and timestamp)
$LogFolder = "C:\LifecycleWorkflows\Logs"
if (!(Test-Path $LogFolder)) {
    New-Item -ItemType Directory -Path $LogFolder | Out-Null
}
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogFile = "$LogFolder\$UserPrincipalName-$Timestamp.log"

# Function to write log output to file
function Write-Log {
    param ([string]$Message)
    $LogEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
    Write-Output $LogEntry
    Add-Content -Path $LogFile -Value $LogEntry
}

Write-Log "🚀 Starting script for user: $UserPrincipalName"

# Load JSON file
$JsonFilePath = "C:\LifecycleWorkflows\access-packages.json"
$JsonData = Get-Content -Path $JsonFilePath | ConvertFrom-Json

# Fetch AD User using domain admin credentials
$ADUser = Get-ADUser -Filter {UserPrincipalName -eq $UserPrincipalName} -Credential $Cred -Properties SamAccountName, DisplayName, Company, Department, MemberOf

if (-not $ADUser) {
    Write-Log "❌ ERROR: No matching user found in AD for UPN $UserPrincipalName"
    exit 2
}

# Extract User Details
$UserCompany = $ADUser.Company
$UserDepartment = $ADUser.Department
$UserGroups = $ADUser.MemberOf  

Write-Log "✅ User Found: $($ADUser.DisplayName)"
Write-Log "   🏢 Company: $UserCompany"
Write-Log "   🏛️ Department: $UserDepartment"
Write-Log "-------------------------------------"

# Function to Add User to AD Group
function Add-UserToGroup {
    param ($GroupName)
    
    # Check if group exists in AD
    $ADGroup = Get-ADGroup -Filter { Name -eq $GroupName } -ErrorAction SilentlyContinue

    if ($ADGroup) {
        # Check if user is already a member
        if ($UserGroups -contains $ADGroup.DistinguishedName) {
            Write-Log "   ℹ️ User was already in group: $GroupName (skipping add)"
            return "AlreadyInGroup"
        } else {
            # Try adding user
            try {
                Add-ADGroupMember -Identity $GroupName -Members $ADUser.SamAccountName -ErrorAction Stop
                Write-Log "   ✅ Successfully added user to group: $GroupName"
                return "Success"
            } catch {
                Write-Log "   ❌ ERROR adding user to group: $GroupName - $_"
                return "Failure"
            }
        }
    } else {
        Write-Log "   ⚠️ WARNING: Group '$GroupName' not found in AD!"
        return "Failure"
    }
}


# Track success/failure
$SuccessCount = 0
$FailureCount = 0
$AlreadyInGroupCount = 0

# Assign Default Access Packages
Write-Log "`n🔹 Assigning Default Access Packages..."
foreach ($group in $JsonData.defaultAccessPackage.Default) {
    $result = Add-UserToGroup -GroupName $group
    if ($result -eq "Success") {
        $SuccessCount++
    } elseif ($result -eq "Failure") {
        $FailureCount++
    } elseif ($result -eq "AlreadyInGroup") {
        $AlreadyInGroupCount++
    }
}

# Assign Company Access Packages
Write-Log "`n🔹 Assigning Company Access Packages..."
if ($UserCompany -and $JsonData.companyAccessPackages.PSObject.Properties.Name -contains $UserCompany) {
    foreach ($group in $JsonData.companyAccessPackages.$UserCompany) {
        $result = Add-UserToGroup -GroupName $group
        if ($result -eq "Success") {
            $SuccessCount++
        } elseif ($result -eq "Failure") {
            $FailureCount++
        } elseif ($result -eq "AlreadyInGroup") {
            $AlreadyInGroupCount++
        }
    }
} else {
    Write-Log "   ❌ No company-specific access packages found for: $UserCompany"
}

# Assign Department Access Packages
Write-Log "`n🔹 Assigning Department Access Packages..."
if ($UserDepartment -and $JsonData.departmentAccessPackages.PSObject.Properties.Name -contains $UserDepartment) {
    foreach ($group in $JsonData.departmentAccessPackages.$UserDepartment) {
        $result = Add-UserToGroup -GroupName $group
        if ($result -eq "Success") {
            $SuccessCount++
        } elseif ($result -eq "Failure") {
            $FailureCount++
        } elseif ($result -eq "AlreadyInGroup") {
            $AlreadyInGroupCount++
        }
    }
} else {
    Write-Log "   ❌ No department-specific access packages found for: $UserDepartment"
}

# Final Report
Write-Log "`n🎯 Processing complete!"
Write-Log "✅ Successfully added to $SuccessCount groups."
Write-Log "ℹ️ Already in $AlreadyInGroupCount groups."
Write-Log "❌ Failed to add to $FailureCount groups."

# Exit codes for Lifecycle Workflows:
# 0 = Success (All groups assigned)
# 1 = Partial Success (Some groups failed)
# 2 = Failure (No groups assigned)
if ($FailureCount -eq 0 -and ($SuccessCount -gt 0 -or $AlreadyInGroupCount -gt 0)) {
    # SUCCESS: All groups were either added or the user was already in them
    Write-Log "🎉 SUCCESS: User assigned to all required groups!"
    exit 0
} elseif ($SuccessCount -gt 0 -or $AlreadyInGroupCount -gt 0) {
    # PARTIAL SUCCESS: Some groups were added or already existed, but others failed
    Write-Log "⚠️ PARTIAL SUCCESS: Some groups failed!"
    exit 1
} else {
    # FAILURE: No groups could be assigned
    Write-Log "❌ FAILURE: No groups could be assigned!"
    exit 2
}

Start-ADSyncSyncCycle -PolicyType Delta
