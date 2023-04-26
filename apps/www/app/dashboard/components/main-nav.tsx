import Link from "next/link";
import { Avatar, Box, Icon, Text, TextField } from "@opub-cdl/ui/src";
import { NotificationMajor, SearchMinor } from "@shopify/polaris-icons";

import { Icons } from "@/components/icons";
import styles from "../dashboard.module.scss";

export function MainNav() {
  return (
    <nav>
      <Box flex justifyContent="space-between" gap="4" alignItems="center">
        <Link href="/">
          <Box flex alignItems="center" gap="2">
            <Icon source={Icons.logo} color="interactive" />
            <Text variant="headingLg" as="h1">
              OPub
            </Text>
          </Box>
        </Link>
        <div className={styles.Search}>
          <TextField
            prefix={<Icon source={SearchMinor} />}
            placeholder="Search"
            name="Search"
            label="Search"
            labelHidden
          />
        </div>
        <div className={styles.User}>
          <Icon color="base" source={NotificationMajor} />
          <div>
            <Avatar
              showInitials
              showLabel
              name="Xquenda Andreev"
              size="small"
            />
          </div>
        </div>
      </Box>
    </nav>
  );
}
