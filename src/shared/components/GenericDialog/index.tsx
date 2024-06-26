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
  Paper,
  Box,
  DialogContentText,
  PaperProps,
} from "@mui/material";
import Draggable from "react-draggable";

const GenericDialog = ({
  titleOptions,
  contentOptions,
  actionOptions,
  onClose,
  onConfirm,
  ...props
}: GenericDialogProps) => {
  const { confirmBtn, cancelBtn } = actionOptions;

  const handleCancel = () => {
    onClose?.()
  };

  return (
    <Dialog
      maxWidth="xs"
      scroll="paper"
      aria-describedby="dialog-description"
      aria-labelledby="draggable-dialog-title"
      sx={{ "& .MuiDialog-paper": { width: "60%", maxHeight: "50%" } }}
      {...props}
      PaperComponent={PaperComponent}
    >
      <DialogTitle
        id="draggable-dialog-title"
        sx={{ cursor: "move", display: "flex", justifyContent: "space-between" }}
      >
        {titleOptions.title}
        <IconButton aria-label="close" component="span"  onClick={handleCancel}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          {contentOptions.text}
        </DialogContentText>
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

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};
