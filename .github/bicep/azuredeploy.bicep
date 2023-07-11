// project name
@minLength(3)
@maxLength(21)
@description('Name of this project')
param projectName string = 'goldenislandswim'

@description('The admin user of the SQL Server')
param sqlAdministratorLogin string = projectName

@description('The password of the admin user of the SQL Server')
@secure()
param sqlAdministratorLoginPassword string

@description('Specifies region of all resources.')
param location string = resourceGroup().location

@description('Date timestamp of when this deployment was run - defaults to UtcNow()')
param lastDeploymentDate string = utcNow('yyMMddHHmmss')

var tags = {
  project: projectName
  lastDeploymentDate: lastDeploymentDate
}

module appInsights 'appinsights.bicep' = {
  name: '${projectName}-ai'
  scope: resourceGroup()
  params: {
    appInsightsName: '${projectName}-ai'
    location: location
    tags: tags
  }
}

module sql 'sql.bicep' = {
  name: '${projectName}-sql'
  scope: resourceGroup()
  params: {
    sqlServerName: '${projectName}-sql'
    sqlAdministratorLogin: sqlAdministratorLogin
    sqlAdministratorLoginPassword: sqlAdministratorLoginPassword
    location: location
    tags: tags
  }
}

var sqlConnectionString = 'Server=tcp:${sql.outputs.settings.fullyQualifiedDomainName},1433;Initial Catalog=${sql.outputs.settings.databaseName};Persist Security Info=False;User ID=${sqlAdministratorLogin};Password=${sqlAdministratorLoginPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'

resource plan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: '${projectName}-app-plan'
  location: location
  kind: 'windows'
  tags: tags
  sku: {
    name: 'F1'
  }
  properties: {}
}

module webapi 'appservice-api.bicep' = {
  name: '${projectName}-api'
  scope: resourceGroup()
  params: {
    appName: '${projectName}-api'
    planId: plan.id
    appInsightsInstrumentationKey: appInsights.outputs.settings.instrumentationKey
    sqlConnectionString: sqlConnectionString
    location: location
    tags: tags
  }
}

module webapp 'appservice-app.bicep' = {
  name: projectName
  scope: resourceGroup()
  params: {
    appName: projectName
    planId: plan.id
    appInsightsInstrumentationKey: appInsights.outputs.settings.instrumentationKey
    apiUrl: webapi.outputs.settings.uri
    location: location
    tags: tags
  }
}
