// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const SendHubspotMessage = async (
  email,
  group_invite_link,
  user_results_link
) => {
  if (!email) {
    throw new Error('Email not provided.')
  }

  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })

  if (!hubspotClient) {
    throw new Error('Failed to initialise HubSpot connection')
  }

  const emailstring = email.split('@')
  emailstring[0] = `${emailstring[0]}+${Math.floor(Math.random() * 100001)}@`
  const emailWithRnd = `${emailstring[0]}${emailstring[1]}`
  if (!hubspotClient) {
    throw new Error('Failed to initialise HubSpot connection')
  }

  const contactObj = {
    properties: {
      email: emailWithRnd,
      group_invite_link: group_invite_link,
      group_results_page_link: group_results_page_link || '',
    },
  }

  try {
    return await hubspotClient.crm.contacts.basicApi.create(contactObj)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { SendHubspotMessage }
