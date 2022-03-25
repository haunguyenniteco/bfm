```jsx padded
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';

<Stack spacing={2}>
  <Stack spacing={2} direction="row">
    <Button color="primary">Primary Button</Button>
    <Button color="secondary">Secondary Button</Button>
  </Stack>
  <div />
  <Stack spacing={2} direction="row">
    <Button color="primary" endIcon={<ArrowForwardIcon />}>CTA</Button>
    <Button color="primary" startIcon={<ArrowForwardIcon />}>CTA</Button>
    <Button>Secondary btn</Button>
    <Button endIcon={<ArrowForwardIcon />}>Secondary btn</Button>
    <Button color="primary" size="small"><AddIcon /></Button>
  </Stack>
</Stack>
```