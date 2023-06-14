import { OIDCProvider, VO } from '@/lib/core/entity/auth-models'
import { StoryFn, Meta } from '@storybook/react'
import { createRandomDIDLong, createRSEAccountUsageLimit } from 'test/fixtures/table-fixtures'

import { CreateRule } from './CreateRule'
import {
    CreateRuleQuery, DIDSearchQuery,
    TypedDIDValidationQuery, TypedDIDValidationResponse,
    RSESearchQuery,
    DIDSearchResponse,
    RSESearchResponse,
} from '@/lib/infrastructure/data/view-model/create-rule'

export default {
    title: 'Components/Pages/CreateRule',
    component: CreateRule,
} as Meta<typeof CreateRule>

const Template: StoryFn<typeof CreateRule> = args => <CreateRule {...args} />

export const CreateRulePage = Template.bind({})
CreateRulePage.args = {
    onSubmit: (query: CreateRuleQuery) => {
        return Promise.resolve({
            success: true,
        })
    },
    didSearch: (query: DIDSearchQuery) => {
        console.log(query)
    },
    didResponse: {
        data: Array.from({ length: 100 }, (_, i) => createRandomDIDLong()),
        fetchStatus: "idle",
    } as DIDSearchResponse,
    didValidation: (query: TypedDIDValidationQuery) => {
        // if the DID contains the string "error", it will be added to the error list
        var localErrorDIDs: TypedDIDValidationResponse = { ErrorList: [] }
        query.DIDList.map((DID: string, index: number) => {
            if (DID.includes("error")) {
                localErrorDIDs.ErrorList.push({ DID: DID, ErrorCodes: [421], Message: "This DID is invalid" })
            }
        })
        // if the error list is empty, the promise will resolve, otherwise it will reject
        if (localErrorDIDs.ErrorList.length === 0) {
            return Promise.resolve(localErrorDIDs)
        }
        else {
            return Promise.reject(localErrorDIDs)
        }
    },
    rseSearch: (query: RSESearchQuery) => {
        console.log("RSE Search Query: ", query)
    },
    rseResponse: {
        data: Array.from({ length: 100 }, (_, i) => createRSEAccountUsageLimit()),
        fetchStatus: "idle",
    } as RSESearchResponse,
}
