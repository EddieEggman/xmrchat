<script lang="ts" setup>
import type { DropdownItem } from "#ui/types";
const { locales, locale, setLocale } = useI18n();

const config = useRuntimeConfig();

const items = computed<DropdownItem[][]>(() => {
  const activeLocales = config.public.activeLocales.split(",");
  return [
    locales.value
      .filter((l) => activeLocales.includes(l.code))
      .map((l) => ({
        code: l.code,
        image: `/images/flags/${l.code}.png`,
        label: l.name || "",
        click: () => setLocale(l.code),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label)),
  ];
});
</script>

<template>
  <UDropdown :items="items" :ui="{ width: 'w-36' }">
    <UButton color="gray" square>
      <span class="ring-1 ring-border rounded-full">
        <img :src="`/images/flags/${locale}.png`" alt="" class="w-[20px]" />
      </span>

      <UIcon name="i-heroicons-chevron-up-down" size="20" />
    </UButton>

    <template #item="{ item }">
      <div class="flex gap-2 items-center">
        <span class="ring-1 ring-border rounded-full">
          <img
            :src="`/images/flags/${item.code}.png`"
            alt=""
            class="w-[20px]"
          />
        </span>
        <span>{{ item.label }}</span>
      </div>
    </template>
  </UDropdown>
</template>

<style scoped></style>
