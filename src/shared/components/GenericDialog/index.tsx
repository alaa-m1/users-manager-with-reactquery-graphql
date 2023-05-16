import { Close } from "@mui/icons-material";
import {
  ButtonProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  IconButton,
  Button,
  Box,
} from "@mui/material";

const GenericDialog = ({
  titleOptions,
  contentOptions,
  actionOptions,
  onClose,
  onConfirm,
  ...props
}: GenericDialogProps) => {
  const { confirmBtn, cancelBtn } = actionOptions;
  return (
    <Dialog
      {...props}
      sx={{ "& .MuiDialog-paper": { width: "60%", maxHeight: "50%" } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {titleOptions.title}
        <IconButton component="span" onClick={() => onClose?.()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>{contentOptions.text}</div>
        {contentOptions.content}
      </DialogContent>
      {(cancelBtn || confirmBtn) && (
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => onConfirm?.()} {...confirmBtn}>
              {confirmBtn?.label}
            </Button>
            <Button onClick={() => onClose?.()} {...cancelBtn}>
              {cancelBtn?.label}
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};
export { GenericDialog };

type GenericDialogProps = DialogProps & {
  titleOptions: {
    title: string | JSX.Element;
    hideTitleCloseBtn?: boolean;
  };
  contentOptions: {
    text?: string;
    content?: string | React.ReactNode;
  };
  actionOptions: {
    cancelBtn?: ButtonProps & { label?: string };
    confirmBtn?: ButtonProps & { label?: string };
  };
  onClose?: () => void;
  onConfirm?: () => void;
};
