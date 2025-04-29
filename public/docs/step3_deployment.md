# 🚀 Step 3: Deployment Guide

This guide will walk you through the process of deploying your
Access Package associations and recommendations to your Entra ID
Tenants using a PowerShell solution created by the community. The
script is hosted on GitHub and is completely free to use.

## 🔧 Export JSON

Start by creating your Access Packages on the Access Package Builder
platform. You can create Access Packages based on default settings,
company associations, or departments. Once your Access Packages are
ready, export them as a JSON file using the options
provided on the website. After downloading the PowerShell script, use the
JSON file that you exported in Step 2 or Step 2.1
as input for the script. This file contains the necessary
configuration for deploying your Access Packages, which the script
will use to automate the setup.

> 🧪 Example json File:

```json
{
  "defaultAccessPackage": {
    "Default": [
      "cloudfil"
    ]
  },
  "companyAccessPackages": {
    "cloudfil.ch": [
      "GSG_CAN_365"
    ]
  },
  "departmentAccessPackages": {
    "IT": [
      "EID-ITProjects"
    ]
  }
}
```

## 💻 PowerShell Script Setup

Next, download the PowerShell script hosted on Github. Take the time
to carefully review the script documentation so that you understand
how it works and how to run it in your environment.

> ⚠️ Important: Script does NOT assign to users. Manual policy assignment is required.

[Access Package Builder - Deployment GitHub](https://github.com/ChrFrohn/Access-Package-Builder)


## ✅ Deploying to Entra ID

Run the PowerShell script in your environment to deploy the
configurations to your Entra ID Tenants. After the script completes,
check the logs for any errors or warnings. You should also review
the portals to confirm that everything is set up correctly and that
the Access Package associations have been deployed as expected. This
deployment guide provides an efficient way to transition your
configurations from the Access Package Builder platform into a
production environment.

**ATTENTION:** The Script does
not assign Access Packages to Users in your organization! The
Assignment Policy has to be enabled manually!

