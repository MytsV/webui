'use client';
import { PageRule as PageRuleStory, RulePageLockEntry } from "@/component-library/components/Pages/PageRule/PageRule";
import { LockState, RuleMeta } from "@/lib/core/entity/rucio";
import { createRuleMeta } from "test/fixtures/table-fixtures";
import { useState, useEffect } from "react";
import useComDOM from "@/lib/infrastructure/hooks/useComDOM";
import { LockStateTag } from "@/component-library/components/Tags/LockStateTag";

export default function PageRule() {
    const comDOM = useComDOM<RulePageLockEntry>(
        "rule-page-lock-query",
        [],
        false,
        Infinity,
        50,
        true
    )
    const [meta, setMeta] = useState<RuleMeta>({} as RuleMeta)
    useEffect(() => {
        setMeta(createRuleMeta())
    }, [])
    useEffect(() => {
        const runQuery = async () => {
            await comDOM.start({
                url: new URL("http://localhost:3000/api/rulepagelockentry"),
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                } as HeadersInit),
                body: null,
            })
        }
        runQuery()
    }, [])
    return (
        <PageRuleStory
            ruleMeta={meta}
            ruleLocks={{
                data: comDOM.query.data,
                fetchStatus: comDOM.query.fetchStatus,
                pageSize: 10,
            }}
        />
    )
}