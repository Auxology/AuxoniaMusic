import {useGenerateApiToken} from "@/actions/useTokenActions.ts"
import {Button} from "@/components/ui/button.tsx";

interface GenerateTokenButtonProps {
    accessToken: string;
}

export default function GenerateTokenButton({ accessToken }: GenerateTokenButtonProps) {
    const {mutate} = useGenerateApiToken();

    async function handleClick() {
        mutate(accessToken);
    }

    return (
        <Button onClick={handleClick}>Generate Token</Button>
    )
}