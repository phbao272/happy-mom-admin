"use client";
import { Anchor, Box, Container, Stack, Text, Title, rem } from "@mantine/core";
import { useStyles } from "tss-react";
import { mq, theme, vars } from "@libs/theme";

export const HomePage = () => {
  const { css } = useStyles();

  return (
    <Box
      component="main"
      py={rem(100)}
      maw={rem(theme.other.maxApplicationWidth)}
      mx="auto"
    >
      <Container>
        <Title
          className={css({
            [`${mq.xs}`]: {
              ...vars.headings.h2,
            },
            fontSize: rem(40),
          })}
        >
          Mantine V7 using TSS for styling
        </Title>
        <Text>
          This repo can be used as a template for using Mantine V7 in a Nextjs
          14 project with{" "}
          <Anchor
            href="https://docs.tss-react.dev/api/tss-usestyles"
            target="_blank"
          >
            TSS
          </Anchor>
          for styling.
        </Text>
        <Stack mt="xl">
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In earum
            placeat voluptatibus eligendi sint? Tenetur quibusdam praesentium
            assumenda nihil. Voluptate, consequatur. Delectus quasi sit labore
            consequuntur quae ex voluptatibus nostrum.
          </Text>

          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In earum
            placeat voluptatibus eligendi sint? Tenetur quibusdam praesentium
            assumenda nihil. Voluptate, consequatur. Delectus quasi sit labore
            consequuntur quae ex voluptatibus nostrum.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
