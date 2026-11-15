# LeadCaptureForm — React Native iOS

A config-driven lead capture form built with React Native + TypeScript.
No UI kit. No form library. Pure `StyleSheet`. iOS simulator target.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node | ≥ 18 |
| npm | ≥ 9 |
| Xcode | ≥ 15 |
| CocoaPods | ≥ 1.14 |
| iOS Simulator | iPhone SE (compact) + iPad Air (wide) |

---

## Install & Run

```bash
# 1 — Install JS dependencies
npm install

# 2 — Install iOS native dependencies
cd ios && pod install && cd ..

# 3 — Start Metro bundler (keep this terminal open)
npm start

# 4a — Run on iPhone SE (compact / 1-column layout)
npm run ios -- --simulator="iPhone SE (3rd generation)"

# 4b — Run on iPad Air (wide / 2-column layout)
npm run ios -- --simulator="iPad Air (5th generation)"
```

> **Tip:** You can also open `ios/LeadCaptureForm.xcworkspace` in Xcode and
> press ▶ Run.

---

## Folder Layout

```
LeadCaptureForm/
├── App.tsx                          ← Root component (mounts LeadFormScreen)
├── src/
│   ├── design-system/               ← Knows NOTHING about leads
│   │   ├── tokens/
│   │   │   ├── colors.ts            ← Color palette
│   │   │   ├── spacing.ts           ← Spacing scale (xxs → xxl)
│   │   │   ├── typography.ts        ← Font sizes, weights, preset styles
│   │   │   └── layout.ts            ← BREAKPOINT + layout constants
│   │   ├── atoms/
│   │   │   ├── TextInputAtom.tsx    ← text / email / phone / textarea
│   │   │   ├── SelectAtom.tsx       ← iOS bottom-sheet style picker
│   │   │   ├── CheckboxAtom.tsx     ← Custom checkbox (no native dep)
│   │   │   └── ButtonAtom.tsx       ← Primary / secondary / destructive
│   │   ├── molecules/
│   │   │   └── Field.tsx            ← label + atom + hint + error
│   │   ├── types/
│   │   │   └── formTypes.ts         ← FieldConfig, FormValues, FormErrors
│   │   ├── DynamicForm.tsx          ← Maps config[] → <Field> per entry
│   │   └── index.ts                 ← Barrel export
│   │
│   └── features/
│       └── lead/                    ← Knows about leads; nothing else does
│           ├── leadConfig.ts        ← THE config array (add fields here)
│           ├── leadValidation.ts    ← Pure validate() function
│           ├── useLeadForm.ts       ← All form state (values/errors/touched)
│           ├── LeadFormScreen.tsx   ← Screen shell; compact vs wide layout
│           └── SuccessScreen.tsx    ← Post-submit summary view
│
├── ios/                             ← Xcode project (do not edit manually)
├── android/                         ← Out of scope
├── package.json
└── tsconfig.json
```

---

## Where Things Live

### Tokens
`src/design-system/tokens/`
- **`colors.ts`** — every color constant used in the app
- **`spacing.ts`** — 7-step spacing scale in points
- **`typography.ts`** — font sizes, weights, and preset `StyleSheet` styles
- **`layout.ts`** — `BREAKPOINT` (744 pt), input heights, border radii, gaps

### Atoms
`src/design-system/atoms/`
Four pure, dumb controls. Each receives `value` + event callbacks.
No business logic. No lead knowledge.

### Field Molecule
`src/design-system/molecules/Field.tsx`
Wraps any atom with label, optional hint, and error message.
`columnSpan` prop drives 2-column placement on wide layouts.

### DynamicForm
`src/design-system/DynamicForm.tsx`
Iterates the config array. Selects the right atom via a `type → component` map.
Owns the compact (1-col) vs regular (2-col) row-grouping logic.

### Form Config
`src/features/lead/leadConfig.ts`
The single source of truth for the lead form's fields.
**Adding a field = adding one object here.**

### Validation Rules
`src/features/lead/leadValidation.ts`
A pure function: `(config, values) → errors`.
No React. No side effects. Testable in plain Node.

### Compact & Regular-Width Layouts
Both layouts are handled in two files:

| File | Responsibility |
|---|---|
| `src/design-system/DynamicForm.tsx` | Field grid: 1-col vs 2-col row grouping |
| `src/features/lead/LeadFormScreen.tsx` | Screen chrome: `SafeAreaView`, `KeyboardAvoidingView`, outer padding, submit button placement |

The switch between layouts is driven by:
```ts
const { width } = useWindowDimensions();
const isWide = width >= BREAKPOINT; // BREAKPOINT = 744 pt
```

---

## Validation Behaviour

| Event | Action |
|---|---|
| Field blur | Validate that field only (`validateField`) |
| Any change on a touched field | Re-validate that field live |
| Submit tap | Validate all visible fields (`validateLeadForm`) |
| Submit while invalid | Block; show every current error |
| Hidden field (Company Name when Individual) | Skipped — never validated |

---

## Out of Scope

Android, backend, auth, third-party form libraries, additional controls.
# react-native
# react-native
# react-native
