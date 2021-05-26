import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import {
    Button,
    Center,
    HStack,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
import useStore from '../../store';
import { useContract, useAdminContract } from '../../hooks/contractHooks';

export default function Home (props) {
    const { isWalletConnected } = useStore();
    const greeterContract = useContract("Greeter");
    const greeterAdminContract = useAdminContract("Greeter");
    const [greeting, setGreetingValue] = useState();
    const [contractGreeting, setContractGreeting] = useState();

    useEffect(async () => {
        if (greeterAdminContract)
            await fetchGreeting();
        else
            setContractGreeting("Disconnected");
    }, [greeterAdminContract]);

    async function fetchGreeting() {
        try {
            if(greeterAdminContract != null) {
                const data = await greeterAdminContract.greet();                
                console.log('data: ', data);
                setContractGreeting(data);
            }
        } catch (err) {
            console.log("Error: ", err);
        }   
    }

    async function setGreeting() {
        try {
            if(greeterContract != null) {
                const transaction = await greeterContract.setGreeting(greeting);
                await transaction.wait();
                fetchGreeting();
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return(
        <Center 
            mt={{
                base: "4rem",
                md: "10rem",
                xl: "10rem"
            }}
            >
            <VStack spacing={10}>
                <Text
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    bgClip="text"
                    fontSize={{
                        "base": "5xl",
                        "md": "6xl",
                        "xl": "6xl"
                    }}
                    fontWeight="extrabold">
                    Greeting: {contractGreeting}
                </Text>

                <Button w="160px" onClick={fetchGreeting}>Fetch Greeting</Button>

                <HStack>
                    <Input w={160} onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
                    <Button w={160} onClick={setGreeting}>Set Greeting</Button>
                </HStack>
                
            </VStack>
        </Center>
    );

} 
