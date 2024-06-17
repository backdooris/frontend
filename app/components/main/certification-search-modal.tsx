import { 
  Container, 
  Stack, 
  Modal, 
  ModalDialog, 
  Typography, 
  ModalClose, 
  Button, 
  Select, 
  Option 
} from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";

function CertificationSearchModal () {
  const [open, setOpen] = useState<boolean>(false);

  return(
    <>
    <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}/>
    <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
    </Button>
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
      <ModalDialog variant="soft">
        <ModalClose />
        <Typography>대분류</Typography>

        <Select
          defaultValue="end"
          indicator={<KeyboardArrowDown />}
          sx={{
          }}
        >
          <Option value="end">경영</Option>
          <Option value="pay">경영(사회 조사 분석)</Option>
        </Select>
        <Select
          defaultValue="end"
          indicator={<KeyboardArrowDown />}
          sx={{
          }}
        >
          <Option value="end">사회조사분석사(1급)</Option>
          <Option value="pay">사회조사분석사(2급)</Option>
        </Select>
        <Button>검색</Button>
      </ModalDialog>
    </Modal>
    </>
  )

}

export { CertificationSearchModal };