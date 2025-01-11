import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from "./screens/global/Topbar"
import Sidebar from "./screens/global/Sidebar"
import Dashboard from "./screens/dashboard";
import Criteria_4_1_Screen from './screens/nba_screens/criteria_4_screen/criteria_4_1_screen';
import Criteria_4_2_Screen from "./screens/nba_screens/criteria_4_screen/criteria_4_2_screen"; 
import Index_Screen from "./screens/nba_screens/index_screen";
import Criteria_4_Index_Screen from "./screens/nba_screens/criteria_4_screen/criteria_4_index_screen";
import Criteria_4_3_Screen from "./screens/nba_screens/criteria_4_screen/criteria_4_3_screen";
import Criteria_4_4_Screen from "./screens/nba_screens/criteria_4_screen/criteria_4_4_screen";
import Criteria_4_5_Screen from "./screens/nba_screens/criteria_4_screen/criteria_4_5_screen";

function App() {
    const [theme, colorMode] = useMode();
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className='app'>
            <Sidebar/>
            ,<main className='content'>
              <Topbar/>
  
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
            
                <Route path='/criteria_4_1_screen' element={<Criteria_4_1_Screen/>}/>
                <Route path='/index_screen' element={<Index_Screen/>}/>
                <Route path='/criteria_4_index_screen' element={<Criteria_4_Index_Screen/>}/>
                <Route path='/criteria_4_2_screen' element={<Criteria_4_2_Screen/>}/>
                <Route path='/criteria_4_3_screen' element={<Criteria_4_3_Screen/>}/>
                <Route path='/criteria_4_4_screen' element={<Criteria_4_4_Screen/>}/>
                <Route path='/criteria_4_5_screen' element={<Criteria_4_5_Screen/>}/>
                

               
              </Routes>
            </main>
  
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  
  export default App;


