export type FastChannel = {
  key: "telegram" | "whatsapp" | "instagram";
  label: string;
  handle: string | null;
  href: string | null;
};

export const siteCopy = {
  supportHours: "پشتیبانی در ساعات کاری (۹ تا ۱۸)",
  supportResponseSla: "پاسخ اولیه معمولاً در کمتر از ۲۴ ساعت کاری انجام می‌شود.",
  authMethod:
    "ورود با شماره موبایل و رمز عبور انجام می‌شود و در بعضی حساب‌ها برای تایید نهایی، کد پیامکی هم ارسال می‌شود.",
} as const;

export const siteConfig = {
  providerJoinPath: "/providers/join",
  contact: {
    email: "mr.d.bani.d@gmail.com",
    cityLabel: "سنندج، کردستان",
    lat: 35.30975320588179,
    lng: 47.00589088173033,
    fastChannels: [
      {
        key: "telegram",
        label: "تلگرام",
        // TODO(business): Add the live Telegram handle and direct link.
        handle: null,
        href: null,
      },
      {
        key: "whatsapp",
        label: "واتساپ",
        // TODO(business): Add the live WhatsApp number/link.
        handle: null,
        href: null,
      },
      {
        key: "instagram",
        label: "اینستاگرام",
        // TODO(business): Add the live Instagram handle/link.
        handle: null,
        href: null,
      },
    ] satisfies FastChannel[],
  },
} as const;
