---
id: regex
title: Regex
---

React Bind provides a collection all useful regex for validation purposes. These regex are collected from the community, created by community, for the community💓

Btw, this regex collection is completely tree-shakable so don't worry about the final bundle size

### Import regex

```javascript
import { regex } from 'react-binden';
```

### Number

**number** validation regex

-   wholeNumber
-   decimalNumber
-   wholeDecimalNumber
-   signedDecimalNumber

### String

**string** validation regex

-   email
-   moderatePassword
-   complexPassword
-   url
-   passport
-   lowercaseOnly
-   uppercaseOnly
-   creditCard

### Date

**Date format** validation regex

-   date_yyyy_mm_dd
-   date_dd_MM_yyyy
-   date_dd_mmm_yyyy

### Time

**Time formate** validation regex

-   time_hours12
-   time_hours12AM_PM
-   time_hours24
-   time_hours24WithSeconds

:::info
It's wiser, probably better to use any date-time library for validating dates & times
[date-fns](https://date-fns.org/), [dayjs](https://day.js.org/), [Luxon](https://moment.github.io/luxon/), [timeago.js](https://timeago.org/) etc are excellence choice for a date-time library

You can use [`useValidatorChain`](/docs/hooks/use-validator-chain) with those library to do multiple validation at once
:::

### Alphanumeric

**Alphanumeric spacing** validation regex

-   alphanumeric_spaceless
-   alphanumeric_spaced

### ⭐ Credits ⭐

List of Contributors or Sources the regex collected/created from/by

-   Me😎 (Just kidding😜)
-   [Nicket Pathak](https://niketpathak.com/)
