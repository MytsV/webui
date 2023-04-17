import { Collapsible } from '../../Helpers/Collapsible';
import { Button } from '../../Button/Button';

export const RulePage = (
    props: {
        pagenum: number,
        activePage: number,
        onNext: (event: any) => void,
        onPrev: (event: any) => void,
        submit?: boolean,
        progressBlocked?: boolean,
        children?: any
    }
) => {
    return (
        <Collapsible showIf={props.activePage === props.pagenum}>
            <div
                className="m-2 p-4 border rounded-md dark:border-2 flex flex-col space-y-2"
                data-testid={`rule-page-${props.pagenum}`}
            >
                <div>
                    {props.children}
                </div>
                <div className="relative w-full h-8">
                    <Collapsible showIf={props.activePage !== 0}>
                        <span className="absolute bottom-0 left-0 w-24">
                            <Button label="Previous" onClick={props.onPrev} />
                        </span>
                    </Collapsible>
                    {!props.submit ? (
                        <span className="absolute bottom-0 right-0 w-24">
                            <Button label="Next" disabled={props.progressBlocked} onClick={props.onNext} />
                        </span>
                    ) : (
                        <span className="absolute bottom-0 right-0 w-24">
                            <Button label="Submit" disabled={props.progressBlocked} type="submit" onClick={props.onNext} />
                        </span>
                    )}
                </div>
            </div>
        </Collapsible>
    )
}