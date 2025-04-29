# 👋 Welcome to Access Package Builder Documentation

This documentation will guide you through the Identity Governance process using the Access Package Builder.

> 🤝 Frist things first, the `most frequently asked question` is which **authorizations** does the Access Package Builder need from my tenant and which queries take place in the background.

The following authorizations are required for the multi-tenant app:

- **User.Read.All**
- **Directory.Read.All**
- **Group.Read.All**

To create even more transparency, the project is community-driven and publicly available on [GitHub](https://github.com/nicowyss/accesspackagebuilder).
In the `auth.js` File you will find all the Graph API Calls.

### 📖 Sections

- [Step 1: Data Quality](step1_data-quality.md)
- [Step 2: Access Package Builder](step2_package-builder.md)
- [Step 2.1: Manual Access Package Builder](step2_1_manual-builder.md)
- [Step 3: Deployment Guide](step3_deployment.md)

### 🧠 Introduction to Identity Governance

Microsoft Entra ID - Identity Governance is the practice of managing
user identities, access rights, and permissions to ensure that users
have the appropriate level of access to resources within an
organization. It helps maintain security, compliance, and
operational efficiency by ensuring that access is granted based on
roles, responsibilities, and business needs. You can use Microsoft Entra ID 
Governance to automatically ensure that the right people have the right 
access to the right resources at the right time.

### ❌ Problem with Manual Permissions

Manually assigning permissions to users is time-consuming,
error-prone, and difficult to scale. As organizations grow, tracking
and managing individual user access becomes increasingly complex.
This often leads to outdated permissions, unauthorized access, and
increased security risks. Manual processes also waste valuable IT
resources, hindering productivity and increasing the likelihood of
compliance violations.

### ✅ How Access Package Builder Helps

The Access Package Builder solves these issues by automating the
assignment of access through a smart algorithm. It analyzes users,
their group memberships, and their relationship to organizational
data, including the department structure. Based on this analysis,
the tool suggests tailored Access Packages that group necessary
resources together for each user or group. This helps streamline
access management, ensuring that users receive the right permissions
while maintaining security and compliance.

Adopting Access Packages powered by intelligent algorithms offers
numerous benefits for organizations:

- **Improved security:** By automating access
  assignments, organizations can reduce the risk of human error and
  ensure that users only have access to the resources they need,
  minimizing the potential for unauthorized access.

- **Enhanced efficiency:** The automated creation of
  Access Packages drastically reduces the time and resources spent
  on permission management, allowing IT teams to focus on more
  strategic tasks.

- **Scalability:** As organizations grow and the number
  of users and resources increases, the algorithm can continue to
  generate and manage Access Packages, ensuring that access remains
  efficient and secure without additional manual effort.

> 📌 Consider watching the video on the Landing Page for a quick walktrough.
