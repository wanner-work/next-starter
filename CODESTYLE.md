## 📁 Folder Structure

```
/
├── assets/
├── src/
│   ├── styles/
│   ├── methods/
│   ├── components/
│   ├── hooks/
│   ├── interfaces/
│   ├── types/
│   ├── enums/
│   ├── classes/
│   ├── ui/ (shadcn/ui)
```

### Rules

* Use **camelCase** for all folders
* Root contains config files (`package.json`, `eslint.config.js`, etc.)
* Entry file must be:

    * `index.ts` or `index.tsx`
    * ❌ `main.ts` is forbidden

---

## 🧩 Components

### Naming Convention

* Must start with **uppercase**
* File name = component name

### File Rules

* One component per file
* Must be a **default export**
* Must be a **function declaration** (NOT arrow function)

#### ✅ Correct

```ts
export default function Component() {
  return <h1>Component</h1>
}
```

#### ❌ Incorrect

```ts
export default const Component = () => {} // arrow function not allowed
```

```ts
export default function () {} // must be named
```

---

### Props

* Define a `Props` interface at top of file
* Only local unless moved to `/interfaces`

#### ✅ Correct

```ts
interface Props {
  name: string
}

export default function Component({ name }: Props) {
  return <h1>{name}</h1>
}
```

#### ❌ Incorrect

```ts
export interface Props {} // must not be exported
```

```ts
interface ComponentProperties {} // must be named Props
```

```ts
export default function Component({ name }: { name: string }) {}
```

---

### Component Size

* Max ~100 lines
* Move logic to **custom hooks** if too large

---

## 🧾 Interfaces

### Rules

* PascalCase naming (`UserData`)
* File name = interface name
* One interface per file
* Must be **default export**

#### ✅ Correct

```ts
export default interface UserData {
  username: string
}
```

#### ❌ Incorrect

```ts
export default interface UserDataInterface {}
```

* ❌ Do NOT use prefix `I` (e.g., `IUserData`)

---

## 🔢 Enums

### Rules

* Same rules as interfaces, except:

    * Cannot directly default export

#### ✅ Correct

```ts
enum View {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

export default View
```

#### ❌ Incorrect

```ts
export enum View {} // not allowed
```

---

## ⚙️ Methods

### Naming

* camelCase

### File Rules

* One method per file
* Must be default exported

#### ✅ Correct

```ts
export default function getRandomNumber() {}
```

#### ❌ Incorrect

```ts
export function a() {}
export function b() {}
```

---

### Method Definition

#### Outside Components

* Must use function declaration
* ❌ No arrow functions

#### Inside Components

* Must use arrow functions

```ts
const update = () => {}
```

* Use `useMemo` / `useCallback` for performance

---

### Method Options

* Optional `Options` interface allowed
* Only local unless moved to `/interfaces`

```ts
interface Options {
  option: boolean
}

export default function method(param: string, options: Options) {}
```

---

## 🔒 Readonly Constants

### Rules

* Use **UPPERCASE_SNAKE_CASE**
* Group into a single object
* Must be default exported

#### ✅ Correct

```ts
const API = {
  path: '/api/v1/',
  port: '4000'
}

export default API
```

#### ❌ Incorrect

```ts
const API_PATH = '/api/v1/'
export default API_PATH
```

* Always wrap even single constants in an object

---

## 🪝 Custom Hooks

### Naming

* Must start with `use`
* File name = hook name

### Rules

* One hook per file
* Must be default export
* Must be function declaration (NOT arrow)

#### ✅ Correct

```ts
export default function useOnlineStatus() {
  const [online, setOnline] = useState(false)
  return { online }
}
```

#### ❌ Incorrect

```ts
export default const useOnlineStatus = () => {}
```

```ts
export default function () {} // must be named
```

---

### Hook Options

* Same rule as method options (`Options` interface)

---

## 📦 Barrel Files

### Definition

A file that re-exports modules (usually `index.ts`)

### Rules

* ✅ Allowed ONLY for libraries
* ❌ Forbidden in application code

---

## ⚠️ Key Principles

* Consistency over flexibility
* Strict file isolation (1 entity per file)
* Prefer explicit structure over shortcuts
* Optimize readability and maintainability