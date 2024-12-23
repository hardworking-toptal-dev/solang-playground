import monaco from "monaco-editor";
import { loader, Monaco } from "@monaco-editor/react";
import Server from "./server";
import { FromServer, IntoServer } from "./codec";
import Client from "./client";
import Language from "./language";
import { EditorService } from "./services";
import debounce from "debounce";
import { protocolToMonaco } from "./utils";

const intoServer = new IntoServer();
const fromServer = FromServer.create();
const client = new Client(fromServer, intoServer);
const editorService = new EditorService(client);

let language: Language;

export async function init(monaco: Monaco) {
  const server = await Server.initialize(intoServer, fromServer);
  language = Language.initialize(client, monaco);

  return await Promise.all([server.start(), client.start()]);
}

export async function mountService(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
  const model = editor.getModel()!;

  client.pushAfterInitializeHook(async () => {
    editorService.fileOpened(model);
  });

  editor.onDidChangeModelContent(
    debounce(() => {
      editorService.fileChanged(model);

      setTimeout(() => {
        let diagnostic = client.diagnostic;
        let markers = protocolToMonaco.asDiagnostics(diagnostic.diagnostics);
        monaco.editor.setModelMarkers(model, "solidity", markers);
      }, 500);
    }, 200),
  );
}
