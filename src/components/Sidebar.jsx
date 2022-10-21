import React from 'react'
import { Drawer, Divider, Box } from '@mui/material'
import { TreeView, TreeItem } from '@mui/lab'
import { useNavigate, useParams } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import logo from '../logo.png'
import CompanyBox from './CompanyBox'
import { regions } from '../regions'

const drawerWidth = 300

const Sidebar = () => {
  const navigate = useNavigate()
  const { region, subregion } = useParams()
  const [expanded, setExpanded] = React.useState([region])
  const [selected, setSelected] = React.useState(subregion)

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#111827',
          color: '#D1D5DB',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          height: '64px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px 18px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/projects/goc-north/koolatong-north')}
      >
        <img style={{ width: '100%' }} src={logo} alt="Blue Carbon Logo" />
      </Box>
      <CompanyBox />
      <Divider sx={{ borderColor: '#1F2937' }} />
      <TreeView
        sx={{ overflow: 'scroll', mt: 2, mb: 2 }}
        expanded={expanded}
        selected={selected}
        onNodeToggle={(e, nodeIds) => {
          setExpanded(nodeIds)
        }}
        onNodeSelect={(e, nodeIds) => {
          setSelected(nodeIds)
        }}
      >
        {regions.map(region => (
          <TreeItem
            key={region.stub}
            label={region.name}
            nodeId={region.stub}
            icon={<AssignmentIcon />}
          >
            {region.subregions.map(subregion => (
              <TreeItem
                key={subregion.stub}
                label={subregion.name}
                nodeId={subregion.stub}
                onClick={() => navigate(`/projects/${region.stub}/${subregion.stub}`)}
              />
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Drawer>
  )
}

export default Sidebar
