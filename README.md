# Summary
The project facilitate DApp development by adding a "console"-like feature to Move code.

Every console message emited by the package are displayed sequentially in a VSCode window.

Example of adding tracing into a function:
    use log::console::{Console}
    public entry fun foo(..., ctx: &TxContext)
    {
        // Initalize the console. Default is to enable all log levels.
        let mut console = log::console::default();

        // Display something at DEBUG level on the VSCode console.
        console.debug(b"foo called");
    }

In this repos you will find:
  move/log: The log::console module
  demo-app/move: Example of a Rust application interacting with a "Counter" DApps that uses log::console.
                 There is a few basic unit test there.

The VSCode client portion is still in development and only a subset of the project is copied here for 
the purpose of review for the RiseIn bootcamp.

The latest full code is in the suibase.io repos:
   https://github.com/ChainMovers/suibase/issues/85

# Live Example
Example of publication/execution on devnet:

## Publication Transaction
Package ID=[0x85b0832b227abb71d58b4d78ecfbff714fa7965c3b81541d7682082da117fdaf]

Package [https://suiexplorer.com/object/85b0832b227abb71d58b4d78ecfbff714fa7965c3b81541d7682082da117fdaf?network=devnet]
TxBlock [https://suiexplorer.com/txblock/AZVhrZb7h3rbMEetBQ2wA4PzLjrqjAMMQE8UYhzWR1pW?network=devnet]

## Transaction for demo-app to perform a log::console event call.
TxBlock [https://suiexplorer.com/txblock/7SCw8ftGdpRvh1NguPGh58Sk8Q1cuinwaCuGzS4Mr2tb?network=devnet]

# Implementation Details
This is the "flow" from the package console call to the display in VSCode:

The move/log module emit a message when a package calls the console.debug().

A suibase-daemon automatically subscribe to monitor the Sui Event and filters
for the last known published package. The console messages are stored in a 
SQLite DB by the daemon.

The VSCode Extension communicate with the suibase-daemon through RPC and use
svelte to build a webview showing the console message in chronological order.


