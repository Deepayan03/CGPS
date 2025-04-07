"use client";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiHome, HiBriefcase, HiDocumentText, HiUser, HiCog, HiLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import logo from "../assets/download.png"
export default function StudentSidebar() {
    console.log(HiBriefcase)
    const sidebarItems = [
        {
          title: "Dashboard",
          icon: HiHome,
          link: "/", 
        },
        {
          title: "Job Listings",
          icon: HiBriefcase,
          link: "/listings", 
        },
        {
          title: "My Applications",
          icon: HiDocumentText,
          link: "/my-applications", 
        },
        {
          title: "Profile",
          icon: HiUser,
          link: "/profile", 
        },
        {
          title: "Settings",
          icon: HiCog,
          link: "/settings", 
        },
        {
          title: "Logout",
          icon: HiLogout,
          link: "/logout",
        },
      ];
    const castIcon = (Icon: any) =>
        Icon as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const CustomNavLink = ({
        to,
        children,
        ...props
      }: {
        to: string;
        children: React.ReactNode;
      }) => {
        return (
          <NavLink
            to={to}
            {...props}
            className={({ isActive }) =>
              `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {children}
          </NavLink>
        );
      };
      
  return (
    <>
    <Navbar className="bg-gray-50" fluid rounded>
      <NavbarBrand className="p-0 h-10 flex justify-center items-center" href="/">
        <img src={logo} className=" p-0 h-[200%] w-[100%] " alt="Logo" />
        
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        
      </NavbarCollapse>
    </Navbar>
    <Sidebar  aria-label="Student Dashboard Sidebar" className="w-64 h-full bg-gray-50 min-h-screen">
  <SidebarItems className="h-full">
    <SidebarItemGroup>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          as={(props) => (
            <CustomNavLink to={item.link} {...props}>
              {props.children}
            </CustomNavLink>
          )}
          className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
            ({ isActive }: { isActive: boolean }) => (isActive ? "bg-gray-200" : "")
          }`}
          icon={castIcon(item.icon)}
        >
          {item.title}
        </SidebarItem>
      ))}
    </SidebarItemGroup>
  </SidebarItems>
</Sidebar>
</>

  );
}
