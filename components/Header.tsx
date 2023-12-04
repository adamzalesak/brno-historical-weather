"use client"

import Link from 'next/link'
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";

function Header () {

    return (
        <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
                <NavigationMenu>
                    <NavigationMenuList>

                        <Button variant={'secondary'}>
                            <Link href="/events" legacyBehavior passHref>
                                <NavigationMenuLink >
                                    All events
                                </NavigationMenuLink>
                            </Link>
                        </Button>
                        <Button variant={'secondary'}>
                            <Link href="/signin" legacyBehavior passHref>
                                <NavigationMenuLink >
                                    Sign in
                                </NavigationMenuLink>
                            </Link>
                        </Button>
                        <Button variant={'secondary'}>
                            <Link href="/registration" legacyBehavior passHref>
                                <NavigationMenuLink >
                                   Register
                                </NavigationMenuLink>
                            </Link>
                        </Button>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}

export default Header
