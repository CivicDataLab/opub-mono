import Link from "next/link";
import { Avatar, Box, Icon, Text, TextField } from "@opub-cdl/ui";
import { NotificationMajor, SearchMinor } from "@shopify/polaris-icons";

import { Icons } from "@/components/icons";

export function MainNav() {
  return (
    <nav>
      <Box flex justifyContent="space-between" gap="2" alignItems="center">
        <Link href="/">
          <Box flex alignItems="center" gap="2">
            <Icon source={Icons.logo} color="interactive" />
            <Text variant="headingLg">OPub</Text>
          </Box>
        </Link>
        <Box width="100%" maxWidth="578px">
          <TextField
            prefix={<Icon source={SearchMinor} />}
            placeholder="Search"
            name="Search"
            label="Search"
            labelHidden
          />
        </Box>
        <Box flex gap="4" alignItems="center">
          <Icon color="base" source={NotificationMajor} />
          <div>
            <Avatar label name="Xquenda Andreev" size="Small" type="initials" />
          </div>
        </Box>
      </Box>
    </nav>
  );
}
