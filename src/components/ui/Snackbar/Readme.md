```jsx
import Button from '@mui/material/Button';
const Example = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open simple snackbar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        action={
          <React.Fragment>
            <Button variant="text" color="primary" size="small" onClick={handleClose}>
              ACTION
            </Button>
          </React.Fragment>
        }
      />
    </div>
  )
}
<Example />