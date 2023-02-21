import { useState, useEffect } from 'react'
import {
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import CheckIcon from '@mui/icons-material/Check'
import { toastSuccessMessage, toastErrorMessage } from '../utils/toast'
import { useAccount, useContract } from '../contexts'
import { uploadFile, uploadJSON } from '../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { regions } from '../regions'

const progressStateToButtonText = [
  'Submit',
  'Uploading file to IPFS',
  'Uploading thumbnail to IPFS',
  'Uploading metadata to IPFS',
  'Submitting transaction',
  'Waiting for transaction to be approved',
]

const AddFileForm = () => {
  const navigate = useNavigate()
  const { region, subregion } = useParams()
  const { signedContract } = useContract()
  const [progressState, setProgressState] = useState(0)
  const [file, setFile] = useState<File | string>('')
  const [thumbnail, setThumbnail] = useState<File | string>('')
  const [fileName, setFileName] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  const [mrv, setMrv] = useState('')
  const account = useAccount()

  useEffect(() => {
    setFileName(typeof file === 'string' ? file : file.name)
  }, [file])

  const { id } = regions.find(d => d.stub === region) || {}

  const handleSubmit = async () => {
    // this shouldn't happen - safety for TypeScript
    if (typeof file === 'string' || typeof thumbnail === 'string')
      throw new Error('File or thumbnail not parsed.')

    try {
      setProgressState(1)
      // 1) POST file to IPFS (save the CID)
      const fileURI = await uploadFile(file)

      // 2) POST thumbnail to IPFS (save the CID)
      setProgressState(2)
      const thumbnailURI = await uploadFile(thumbnail)

      // 3) Construct JSON file + POST to IPFS (using CIDs from 1 + 2)
      setProgressState(3)
      const fileJSON = {
        fileURI,
        thumbnailURI,
        fileName,
        fileDescription,
        createdBy: account,
        createdAt: Date.now(),
        tokenId: id,
        subregion: subregion,
        mrv: mrv,
      }
      const metadataURI = await uploadJSON(fileJSON)

      setProgressState(4)
      // 4) Call addFileToToken method on the smart contract with EthersJS + MetaMask
      const txn = await signedContract!.addFileToToken(id, metadataURI)
      toastSuccessMessage('Transaction submitted. Waiting for the transaction to be approved.')

      // 5) Wait for next block for file to be visible
      setProgressState(5)
      await txn.wait()
      toastSuccessMessage('File successfully added to the token.')

      // 6) Upload complete => go to Project Dashboard
      navigate(`/projects/${region}/${subregion}`)
    } catch (err) {
      console.log(err)
      toastErrorMessage(err as string)
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        component="label"
        size="large"
        sx={{ textTransform: 'none', width: '500px', mb: 3 }}
        startIcon={<DriveFolderUploadIcon />}
        endIcon={file && <CheckIcon />}
      >
        Upload File
        <input type="file" name="file" hidden onChange={e => setFile(e.target.files![0])} />
      </Button>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          component="label"
          size="large"
          sx={{ textTransform: 'none', width: '500px' }}
          startIcon={<DriveFolderUploadIcon />}
          endIcon={thumbnail && <CheckIcon />}
        >
          Upload Thumbnail
          <input onChange={e => setThumbnail(e.target.files![0])} type="file" hidden />
        </Button>
        <FormLabel>* Miniumum resolution: 240px</FormLabel>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>File Name</InputLabel>
        <OutlinedInput
          sx={{ width: '500px' }}
          label="Project Name"
          value={fileName}
          onChange={event => setFileName(event.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>File Description</InputLabel>
        <OutlinedInput
          sx={{ width: '500px' }}
          label="Project Description"
          value={fileDescription}
          onChange={event => setFileDescription(event.target.value)}
        />
      </FormControl>
      <FormControl sx={{ mb: 3, width: '500px' }}>
        <InputLabel>MRV</InputLabel>
        <Select value={mrv} label="MRV" onChange={event => setMrv(event.target.value)}>
          <MenuItem value={'baseline'}>Baseline</MenuItem>
          <MenuItem value={'degraded'}>Degraded</MenuItem>
          <MenuItem value={'cea'}>CEA</MenuItem>
          <MenuItem value={'NA'}>N/A</MenuItem>
        </Select>
      </FormControl>
      <LoadingButton
        loading={progressState !== 0}
        loadingPosition={'start'}
        variant="contained"
        size="large"
        sx={{ textTransform: 'none', width: '500px', mb: 3 }}
        onClick={() => handleSubmit()}
        disabled={
          progressState !== 0 || !file || !fileName || !thumbnail || !fileDescription || !mrv
        }
        fullWidth
      >
        {progressStateToButtonText[progressState]}
      </LoadingButton>
    </>
  )
}

export default AddFileForm
