```jsx
import { useState } from 'react';

const [value, setValue] = useState('');
<>
  <Search value={value} onChange={e => {
    setValue(e.target.value);
  }} />
  <Search value="Search active" />
</>
```
