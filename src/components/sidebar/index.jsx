import React, { useState } from "react";
import LogoIcon from "../../assets/media/logos/default-small.svg";
import Logo from "../../assets/media/logos/default-dark.svg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {
  MdOutlineDashboardCustomize,
  MdStickyNote2,
  MdOutlineFormatColorFill,
  MdWidgets,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FaRegAddressBook, FaUser } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { GrAnalytics } from "react-icons/gr";
import { LuCodesandbox } from "react-icons/lu";
import { HiColorSwatch } from "react-icons/hi";
import { GoProject } from "react-icons/go";
import { TbArrowBarToRight } from "react-icons/tb";

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isOpen) setActiveDropdown(null);
  };

  const handleDropdownToggle = (groupIndex, itemIndex) => {
    const dropdownKey = `${groupIndex}-${itemIndex}`;
    setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const menuGroups = [
    {
      items: [
        {
          icon: <RiDashboardHorizontalFill size="22px" />,
          label: "Dashboards",
          subItems: [
            { name: "Dashboard 1", link: "/dashboard1" },
            { name: "Dashboard 2", link: "/dashboard2" },
          ],
        },
      ],
    },
    {
      label: "PAGES",
      items: [
        {
          icon: <FaRegAddressBook />,
          label: "User Profile",
          subItems: [
            { name: "Profile", link: "/profile" },
            { name: "Settings", link: "/settings" },
          ],
        },
        {
          icon: <MdOutlineDashboardCustomize />,
          label: "Account",
          subItems: [
            { name: "Account Details", link: "/account-details" },
            { name: "Billing", link: "/billing" },
          ],
        },
        {
          icon: <FaUser />,
          label: "Authentication",
          subItems: [
            { name: "Login", link: "/login" },
            { name: "Register", link: "/register" },
          ],
        },
        {
          icon: <BsBank2 />,
          label: "Corporate",
          subItems: [
            { name: "Overview", link: "/overview" },
            { name: "Team", link: "/team" },
          ],
        },
        {
          icon: <GrAnalytics />,
          label: "Social",
          subItems: [
            { name: "Facebook", link: "https://www.facebook.com" },
            { name: "Twitter", link: "https://www.twitter.com" },
          ],
        },
        {
          icon: <MdOutlineFormatColorFill />,
          label: "Blog",
          subItems: [
            { name: "Posts", link: "/posts" },
            { name: "Categories", link: "/categories" },
          ],
        },
        {
          icon: <LuCodesandbox />,
          label: "FAQ",
          subItems: [
            { name: "General", link: "/faq-general" },
            { name: "Technical", link: "/faq-technical" },
          ],
        },
        {
          icon: <HiColorSwatch />,
          label: "Pricing",
          subItems: [
            { name: "Plans", link: "/plans" },
            { name: "Discounts", link: "/discounts" },
          ],
        },
        {
          icon: <MdWidgets />,
          label: "Careers",
          subItems: [
            { name: "Jobs", link: "/jobs" },
            { name: "Internships", link: "/internships" },
          ],
        },
        {
          icon: <GoProject />,
          label: "Utilities",
          subItems: [
            { name: "Tools", link: "/tools" },
            { name: "Resources", link: "/resources" },
          ],
        },
        {
          icon: <GoProject />,
          label: "Widgets",
          subItems: [
            { name: "Add Widget", link: "/add-widget" },
            { name: "Remove Widget", link: "/remove-widget" },
          ],
        },
      ],
    },
    {
      label: "APPS",
      items: [
        {
          icon: <GoProject />,
          label: "Projects",
          subItems: [
            { name: "Current", link: "/current-projects" },
            { name: "Completed", link: "/completed-projects" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={`flex flex-col h-full ${
        isOpen || isHovered ? "w-72" : "w-20"
      } bg-black duration-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full border-b border-gray-800 border-dashed flex items-center justify-between h-20 block">
        {isOpen || isHovered ? (
          <>
            <img src={Logo} alt="logo" className="h-6 m-8" />
            <div
              className="p-2 rounded-md bg-gray-300 h-8 cursor-pointer translate-x-[20px] flex items-center justify-center"
              onClick={handleSidebarToggle}
            >
              <TbArrowBarToRight
                className={`text-primary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </>
        ) : (
          <>
            <img src={LogoIcon} alt="logoIcon" className="h-12 w-8 m-6" />
            <div
              className="p-2 rounded-md bg-gray-300 h-8 cursor-pointer translate-x-[-10px] flex items-center justify-center"
              onClick={handleSidebarToggle}
            >
              <TbArrowBarToRight
                className={`text-primary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col h-full overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mt-4">
            <h2
              className={`text-gray-400 text-xs ml-6 my-2 text-left transition-opacity duration-200 ${
                isOpen || isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {group.label}
            </h2>
            <ul className="flex flex-col">
              {group.items.map((item, itemIndex) => {
                const isActive =
                  activeDropdown === `${groupIndex}-${itemIndex}`;
                const isDashboard =
                  item.label === "Dashboards" || item.label === "Dashboard";
                return (
                  <li
                    key={`${groupIndex}-${itemIndex}`}
                    className="flex flex-col items-start p-2 mt-1 text-sm"
                  >
                    <div
                      className={`flex items-center cursor-pointer w-full h-6 p-2 transition-transform duration-200 ${
                        isOpen || isHovered ? "justify-start ml-4" : "justify-center"
                      } ${isDashboard ? "text-white" : "text-gray-700 hover:text-white"}`}
                      onClick={() => handleDropdownToggle(groupIndex, itemIndex)}
                    >
                      <span
                        className={`${
                          isDashboard ? "text-white" : ""
                        } text-lg`}
                      >
                        {item.icon}
                      </span>
                      {(isOpen || isHovered) && (
                        <span
                          className={`mx-4 font-medium flex items-center justify-between w-full ${
                            isDashboard
                              ? "text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {item.label}
                          <MdKeyboardArrowDown
                            className={`transition-transform duration-200 ${
                              isActive ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </span>
                      )}
                    </div>
                    <ul
                      className={`ml-16 text-gray-400 list-disc transition-all duration-200 overflow-hidden ${
                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="mt-1">
                          <a
                            href={subItem.link}
                            className="flex items-start hover:text-white"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {isOpen || isHovered ? (
          <button className="h-12 bg-gray-800 p-2 my-6 rounded-md">
            Docs & Components
          </button>
        ) : (
          <MdStickyNote2 className="w-8 h-8 bg-gray-800 p-2 my-6 rounded-md" />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
