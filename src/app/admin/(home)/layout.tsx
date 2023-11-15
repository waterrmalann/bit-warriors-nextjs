

import { MainNav } from "./components/MainNav";
import { UserNav } from "./components/UserNav";


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
            {children}
          </div>
        </>
      )
}
