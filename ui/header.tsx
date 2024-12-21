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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const menuItems = [
    { name: "Predicciones", path: "/predictions" },
    { name: "Resultados", path: "/results" },
    { name: "Quiniela", path: "/quiniela" },
  ];

  console.log("session", session);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState<"sticky" | "static">("sticky");
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 526) {
      setIsSticky("static");
    }
  }, []);

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false); // Cierra el menú
    setTimeout(() => router.push(path), 0); // Navega después del cierre del menú
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position={isSticky}
      isBlurred={false}
      isMenuOpen={isMenuOpen} // Enlazamos el estado manualmente
      className="mb-4"
    >
      {/* Toggle icon */}
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
          <Link href="/">
            <span className="text-lg font-bold hidden sm:inline text-foreground">
              QuiniSindic
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Menu en mobile */}
      <NavbarMenu className="flex flex-col gap-4 items-center">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <button
              onClick={() => handleMenuItemClick(item.path)}
              className="text-inherit"
            >
              {item.name}
            </button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Avatar */}
      <NavbarContent as="div" justify="end">
        {/* Menu en desktop */}
        <NavbarContent
          className="hidden sm:flex gap-4 text-foreground"
          justify="end"
        >
          {menuItems.map((item) => (
            <NavbarItem key={item.path}>
              <button
                onClick={() => handleMenuItemClick(item.path)}
                className="text-inherit"
              >
                {item.name}
              </button>
            </NavbarItem>
          ))}
        </NavbarContent>
        
        {session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session.user?.name || "Usuario"}
                size="sm"
                src={session.user?.image || "https://i.pravatar.cc/150"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Conectado como</p>
                <p className="font-semibold">{session.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src="/default-avatar.png" // Asegúrate de tener una imagen por defecto
            />
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
