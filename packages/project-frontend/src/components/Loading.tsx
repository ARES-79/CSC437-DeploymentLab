import { Spinner } from "./Spinner";

export function Loading() {
    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Spinner className="size-8" />
        </div>
    );
}