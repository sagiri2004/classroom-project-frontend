import { Box } from "@mui/material";

import Header from "../components/Header";

function Default({ children }) {
    return ( 
        <Box>
            <Header />
            {children}
        </Box>
     );
}

export default Default;