import { Box, Collapse, Group, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { IconType } from "react-icons";
import { BsChevronDown } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./LinkGroup.module.scss";

interface LinksGroupProps {
  icon: IconType;
  label: string;
  pathName: string;
  links?: { label: string; link: string; pathname?: string }[];
  toggleMenuExpand: () => void;
  menuExpand: boolean;
  closeMenuExpand: () => void;
}

export const LinksGroup = ({
  icon: IconType,
  label,
  pathName,
  links,
  toggleMenuExpand,
  closeMenuExpand,
  menuExpand,
}: LinksGroupProps) => {
  const { pathname: currentPathName } = useLocation();

  const navigate = useNavigate();

  const hasLinks = Array.isArray(links);

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <NavLink to={link.link} key={link.label}>
        {({ isActive }) => (
          <Group
            className={isActive ? classes.link_active : classes.link}
            key={link.label}
          >
            {link.label}
          </Group>
        )}
      </NavLink>
    );
  });

  const handleNavMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    toggleMenuExpand();
    navigate(links ? links[0].link : "/");
  };

  return (
    <>
      <NavLink
        to={pathName}
        className={classes.link_container}
        onClick={hasLinks ? handleNavMenuClick : closeMenuExpand}
        end
      >
        {({ isActive }) => (
          <UnstyledButton
            w="90%"
            p={12}
            className={isActive ? classes.control_active : classes.control}
          >
            <Group justify="space-between">
              <Group display="flex" align="center">
                <IconType size={24} className="test" />
                <Box ml="sm">{label}</Box>
              </Group>

              {hasLinks && (
                <BsChevronDown
                  className={clsx(
                    classes.chevron,
                    currentPathName.includes(pathName) && menuExpand
                      ? classes.chevron_active
                      : classes.chevron_inactive
                  )}
                  size={14}
                />
              )}
            </Group>
          </UnstyledButton>
        )}
      </NavLink>

      {hasLinks ? (
        <Collapse mr={12} in={menuExpand}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
};
