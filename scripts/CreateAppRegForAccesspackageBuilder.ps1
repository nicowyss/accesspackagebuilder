# Prerequisites:
# - Install the Microsoft Graph PowerShell module: Install-Module Microsoft.Graph -Scope CurrentUser
# - Ensure you have the necessary permissions to create app registrations in Azure AD.

# Connect to Microsoft Graph interactively
Connect-MgGraph -Scopes "Application.ReadWrite.All"

# Create the app registration
$appRegistration = @{
    displayName = "APR-AccessPackageBuilder-Demo"
    signInAudience = "AzureADMultipleOrgs" # Multi-tenant
    web = @{
        redirectUris = @("http://localhost:3000/auth/redirect")
        homePageUrl = "http://localhost:3000"
    }
    requiredResourceAccess = @(
        @{
            resourceAppId = "00000003-0000-0000-c000-000000000000" # Microsoft Graph
            resourceAccess = @(
                @{ id = "df021288-bdef-4463-88db-98f22de89214"; type = "Role" } # User.Read.All
                @{ id = "e1fe6dd8-ba31-4d61-89e7-88639da4683d"; type = "Role" } # Directory.Read.All
                @{ id = "5b567255-7703-4780-807c-7be8301ae99b"; type = "Role" } # Group.Read.All
            )
        }
    )
}

# Use the New-MgApplication cmdlet to create the app registration
$response = New-MgApplication -DisplayName $appRegistration.displayName `
    -SignInAudience $appRegistration.signInAudience `
    -Web $appRegistration.web `
    -RequiredResourceAccess $appRegistration.requiredResourceAccess

# Output the app registration details
Write-Host "App Registration Created:"
Write-Host "Client ID: $($response.AppId)"
Write-Host "Tenant ID: $((Get-MgOrganization).Id)"

# Create a client secret for the app registration
$secret = Add-MgApplicationPassword -ApplicationId $response.Id -PasswordCredential @{
    DisplayName = "DefaultSecret"
}

# Output the client secret
Write-Host "Client Secret: $($secret.SecretText)"