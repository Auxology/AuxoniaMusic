import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

async function generateApiToken(accessToken: string) {
    const response = await axiosInstance.post("/token/generate",
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    console.log(response.data);
    return response.data;
}

export function useGenerateApiToken() {
    return useMutation({
        mutationKey: ['generateApiToken'],
        mutationFn: generateApiToken,
        onMutate: () => {},
        onSuccess: () => {},
        onError: () => {},
    })
}