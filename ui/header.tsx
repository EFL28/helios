"use client";
import QuinisindicLogo from "@/app/icons/QuinisindicLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Header() {
  const menuItems = [
    { name: "Predicciones", path: "/predictions" },
    { name: "Resultados", path: "/results" },
    { name: "Quiniela", path: "/quiniela" },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState<"sticky" | "static">("sticky");
  // const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Solo aplica el comportamiento en pantallas pequeñas (por ejemplo, menos de 526px)
    if (window.innerWidth < 526) {
      setIsSticky("static");
      // setShouldHide(true);
    } else {
      // setShouldHide(false);
    }
  }, []);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position={isSticky}
      isBlurred={false}
      className="mb-4"
      // shouldHideOnScroll={shouldHide}
    >
      {/* Toogle icon */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden text-foreground"
      />

      {/* Logo y marca */}
      <NavbarContent
        as="div"
        justify="center"
        className="flex justify-center sm:justify-between w-full"
      >
        <NavbarBrand className="flex items-center justify-center w-full sm:justify-start sm:w-auto">
          <Link href="/">
            <QuinisindicLogo />
          </Link>
          <span className="text-lg font-bold hidden sm:inline text-foreground">
            QuiniSindic
          </span>
        </NavbarBrand>
      </NavbarContent>

      {/* Menu en mobile*/}
      <NavbarMenu className="flex flex-col gap-4 items-center">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Avatar */}
      <NavbarContent as="div" justify="end">
        {/* Menu en desktop*/}
        <NavbarContent
          className="hidden sm:flex gap-4 text-foreground"
          justify="end"
        >
          {menuItems.map((item) => (
            <NavbarItem key={item.path}>
              <Link href={item.path}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
