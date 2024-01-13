// Sui Imports
import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useNetworkVariable } from "./networkConfig";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
//import { useWalletKit } from '@mysten/wallet-kit';

export const useMoveCalls = () => {
    const client = useSuiClient(); // new SuiClient({ url: getFullnodeUrl('devnet') });
    //const { signAndExecuteTransactionBlock } = useWalletKit();
    //const currentAccount = useCurrentAccount(); 
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    const packageObjectId = useNetworkVariable("devhubPackageId");
    const tx = new TransactionBlock(); // Create a transaction block
    const devhub_id: string = useNetworkVariable("devhub");
    const devhub = tx.object(devhub_id);
 
    const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
        id: devhub_id,
        options: {
            showContent: true,
            showOwner: true,
        },
    });

    // Move Calls
 
    const handleCreateDeveloperCard = async () => {
        
        const [coin] = tx.splitCoins(tx.gas, [1]) // define payment coin
  
        // Calls the create_card function from the devcard package
        tx.moveCall({
            target: `${packageObjectId}::devcard::create_card`,
            arguments: [
                tx.pure.string('Matt Patt'), // name
                tx.pure.string('Frontend Developer'), // title
                tx.pure.string('https://example_url.png'), // img_url 
                tx.pure.u8(3), // years_of_experience
                tx.pure.string('JavaScript, Typescript, Next.js, Node.js'), // technologies
                tx.pure.string('https://mattpatt.dev'), // portfolio
                tx.pure.string('matt.patt@dev.com'), // contact
                coin, // payment coin
                devhub, // devhub obj
            ],
        });
 
        // Sign and execute the transaction block
        signAndExecute(
            {
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                },
            },
            {
                onSuccess: (tx) => {
                    client.waitForTransactionBlock({ digest: tx.digest }).then(() => {refetch();});
                },
            },
        );

        if (isPending) return <Text>Loading...</Text>;

        if (error) return <Text>Error: {error.message}</Text>;

        if (!data.data) return <Text>Not found</Text>;
  
    }
 
    const updateCardDescriptionFunction = async () => { 
        // Calls update_card_description function from the devcard package
        tx.moveCall({
            target: `${packageObjectId}::devcard::update_card_description`,
            arguments: [
                devhub, // devhub obj
                tx.pure.string('New description'),
                tx.pure.u64(2)
            ],
        });
  
        // Sign and execute the transaction block
        signAndExecute(
            {
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                },
            },
            {
                onSuccess: (tx) => {
                    client.waitForTransactionBlock({ digest: tx.digest }).then(() => {refetch();});
                },
            },
        );

        if (isPending) return <Text>Loading...</Text>;

        if (error) return <Text>Error: {error.message}</Text>;

        if (!data.data) return <Text>Not found</Text>;
    }
 
    const deactivateCard = async () => {
     
        // Calls deactivate_card function from the devcard package
        tx.moveCall({
            target: `${packageObjectId}::devcard::deactivate_card`,
            arguments: [
                devhub, // devhub obj
                tx.pure.u64(1)
            ],
        });
   
        // Sign and execute the transaction block
        signAndExecute(
            {
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                },
            },
            {
                onSuccess: (tx) => {
                    client.waitForTransactionBlock({ digest: tx.digest }).then(() => {refetch();});
                },
            },
        );

        if (isPending) return <Text>Loading...</Text>;

        if (error) return <Text>Error: {error.message}</Text>;

        if (!data.data) return <Text>Not found</Text>;
    }
   
    return {handleCreateDeveloperCard, updateCardDescriptionFunction, deactivateCard}
}