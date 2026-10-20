import { a, defineData, type ClientSchema } from '@aws-amplify/backend'

const schema = a.schema({
  Message: a
    .model({
      name: a.string().required(),
      message: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})