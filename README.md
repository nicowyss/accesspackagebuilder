![Logo](https://accesspackagebuilder.dev/images/apb-logo-github.png)

# Access Package Builder  

A web application designed to simplify the visualization and management of access packages in Entra ID. This tool helps administrators design access packages efficiently, ensuring secure and streamlined user access.  

## Badges  

![Build Status](https://img.shields.io/github/actions/workflow/status/nicowyss/accesspackagebuilder/deploy.yml?label=Build)
![GitHub Issues](https://img.shields.io/github/issues/nicowyss/accesspackagebuilder)
![GitHub Contributors](https://img.shields.io/github/contributors/nicowyss/accesspackagebuilder)
![GitHub License](https://img.shields.io/github/license/nicowyss/accesspackagebuilder)
![Node.js Version](https://img.shields.io/badge/Node.js-20-green)
![Azure Entra ID](https://img.shields.io/badge/Entra%20ID-Supported-purple)

## Features  

- 🚀 **Simplify Access**: Visualize group memberships effortlessly.
- 🌍 **Dynamic Visuals**: Explore interactive maps of users, departments, and companies.
- 🤖 **Smart Suggestions**: Get automated Access Package recommendations tailored to your data.
- 🔍 **Clear Insights**: Identify unassigned groups and excluded users with ease.
- 🎯 **Custom Filters**: Zoom in on specific departments or companies in seconds.
- 🔗 **Seamless Microsoft Integration**: Built for Microsoft Entra ID Governance.  

## Roadmap  

- [ ] 
- [ ] 
- [ ] 

## Run Locally  

### Prerequisites  

#### Software  
- Install [Node.js](https://nodejs.org/)  
- Install [Express](https://expressjs.com/)  

Install dependencies:  
```bash
npm install
```

#### Entra ID App Registration  
Create an Entra ID app registration (multi-tenant) with the following permissions:  
- `User.Read.All`  
- `Directory.Read.All`  
- `Group.Read.All`  

You can use a PowerShell script to create the app registration (requires `Application.ReadWrite.All` permissions).  
[Link to PowerShell script](#)  

#### Environment Variables  
Add the following to a `.env` file:  
```env
AZURE_CLIENT_ID=<your-client-id>
AZURE_CLIENT_SECRET=<your-client-secret>
```

### Running the Project  

1. **Fork the Repository**  
   Fork this repo: [Access Package Builder](https://github.com/nicowyss/accesspackagebuilder.git)  

2. **Clone the Repository**  
   ```bash
   git clone https://github.com/YOURGITHUBUSERNAME/accesspackagebuilder.git
   cd accesspackagebuilder
   ```

3. **Start the Server**  
   ```bash
   npm start
   ```

4. **Access the Application**  
   Open your browser and navigate to:  
   [http://localhost:3000](http://localhost:3000)  

## Deployment  

This project can be deployed using:  
- **Azure App Service**  
- **GitHub Actions**  

## Author(s)  

- [@nicowyss](https://github.com/nicowyss)  

## License  

This project is licensed under the [MIT License](LICENSE).  