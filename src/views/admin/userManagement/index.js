/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {Box, Grid, Table, Thead, Tbody, Tr, Th, Td, IconButton} from "@chakra-ui/react";

// Assets
import React from "react";
import { UserDatabase } from "variables/firestore/get-database";
import {BiEdit} from "react-icons/bi";
import {BsEye} from "react-icons/bs";
import {useHistory} from "react-router-dom";

export default function UserManagement() {
    const history = useHistory();
    const data = UserDatabase();
    console.log('data: ', data);

    if (data === null) {
        // Data is still loading
        return <p>Loading...</p>;
    }

    if (data === undefined) {
        // There was an error fetching data
        return <p>Error fetching data. Please try again later.</p>;
    }

    const viewUser = async (userId) => {
        // Add your logic here, e.g., fetch user details or navigate to a user profile page
        // console.log(`View user with ID: ${userId}`);
        history.push("/admin/view-user");
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Grid>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Full Name</Th>
                            <Th>Email Address</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item) => (
                            <Tr key={item.uuid}>
                                <Td>{item.fullName}</Td>
                                <Td>{item.emailAddress}</Td>
                                <Td>
                                    <IconButton
                                    icon={<BiEdit />} // Use the imported icon component here
                                    size="sm"
                                    colorScheme="teal"
                                    aria-label="Edit"
                                    style={{marginRight: '10px'}}
                                    />

                                    <IconButton
                                        icon={<BsEye />} // Use the imported icon component here
                                        size="sm"
                                        colorScheme="teal"
                                        aria-label="Edit"
                                        onClick={() => viewUser(item.uuid)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Grid>
        </Box>
    );
}
