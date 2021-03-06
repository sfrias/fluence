/*
 * Copyright 2020 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as PeerId from "peer-id";
import Multiaddr from "multiaddr"
import {FluenceClient} from "./fluenceClient";
import * as log from "loglevel";
import {LogLevelDesc} from "loglevel";

log.setLevel('info')

export default class Fluence {

    static setLogLevel(level: LogLevelDesc): void {
        log.setLevel(level);
    }

    /**
     * Generates new peer id with Ed25519 private key.
     */
    static async generatePeerId(): Promise<PeerId> {
        return await PeerId.create({keyType: "Ed25519"});
    }

    /**
     * Connect to Fluence node.
     *
     * @param multiaddr must contain host peer id
     * @param peerId your peer id. Should be with a private key. Could be generated by `generatePeerId()` function
     */
    static async connect(multiaddr: string | Multiaddr, peerId: PeerId): Promise<FluenceClient> {
        let client = new FluenceClient(peerId);

        await client.connect(multiaddr);

        return client;
    }
}

declare global {
    interface Window {
        Fluence: Fluence;
        test: any
    }
}

window.Fluence = Fluence;
