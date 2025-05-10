import {createFileRoute} from '@tanstack/react-router'
import {isAuthenticated} from "@/utils/routeGuards";
import GenerateTokenButton from "@/components/token/generateButton.tsx";
import {GeneratePlaylistArea} from "@/components/service/generatePlaylist.tsx";

export const Route = createFileRoute('/debug/')({
  component: RouteComponent,
  loader: async () => {
      return await isAuthenticated();
  }
})

function RouteComponent() {
  const data= Route.useLoaderData();


  return (
      <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
          <h1>This is debug page</h1>

          <GenerateTokenButton
              accessToken={data?.sessionData?.session?.access_token}
          />

          <GeneratePlaylistArea
              accessToken={data?.sessionData?.session?.access_token}
              providerToken={data?.sessionData?.session?.provider_token}
          />

      </div>
  )
}
