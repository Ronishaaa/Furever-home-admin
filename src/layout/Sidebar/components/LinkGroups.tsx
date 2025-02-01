import { Box, Group, UnstyledButton } from "@mantine/core";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import classes from "./LinkGroup.module.scss";

interface LinksGroupProps {
  icon: IconType;
  label: string;
  pathName: string;
}

export const LinksGroup = ({
  icon: IconType,
  label,
  pathName,
}: LinksGroupProps) => {
  return (
    <>
      <NavLink to={pathName} className={classes.link_container} end>
        {({ isActive }) => (
          <UnstyledButton
            w="100%"
            className={isActive ? classes.control_active : classes.control}
          >
            <Group display="flex" align="center">
              <IconType size={24} className="test" />
              <Box ml="sm">{label}</Box>
            </Group>
          </UnstyledButton>
        )}
      </NavLink>
    </>
  );
};
