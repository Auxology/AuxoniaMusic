import {createFileRoute} from '@tanstack/react-router'
import {isAuthenticated} from "@/utils/routeGuards";
import GenerateTokenButton from "@/components/token/generateButton.tsx";

export const Route = createFileRoute('/debug/')({
  component: RouteComponent,
  loader: async () => {
      return await isAuthenticated();
  }
})

function RouteComponent() {
  const data= Route.useLoaderData();


  return (
      <div>
          <h1>This is debug page</h1>

          <GenerateTokenButton
              accessToken={data?.sessionData?.session?.access_token}
          />

      </div>
  )
}
