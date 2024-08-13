

// 選択ノードに対してファイルリンクに基づいてエッジを上書き更新する。

// 上書きと足し合わせの機能を実装する。

import {
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting,
} from 'obsidian';

import { CanvasEdgeData } from "obsidian/canvas";


export default class MyPlugin extends Plugin {
	async onload() {
		// リボン（左サイドメニュー）にアイコンを追加する。
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// ここに動作を記述。
			if(this.is_active_leaf_canvas()) {
				// @ts-ignore
				const canvas = this.app.workspace.activeLeaf.view.canvas
				const all_data = canvas.getData();
				const selected_data = canvas.getSelectionData();
				
				// @ts-ignore
				const selected_file_nodes = Array.from(selected_data.nodes).filter((value) => value.type === "file");
				if(selected_file_nodes.length <= 0) return;

				const all_file_links = this.app.metadataCache.resolvedLinks;
				console.log(all_data);
				console.log(selected_file_nodes);
				console.log(all_file_links);

				const selected_nodes_file_path:string[] = []
				for(const node of selected_file_nodes)
				{
					// @ts-ignore
					selected_nodes_file_path.push(node.file);
				}

				const edges_data_to_update: CanvasEdgeData[] = [];
				for(const node of selected_file_nodes)
				{
					// @ts-ignore
					const file_path:string = node.file;
					if(file_path in all_file_links == false)continue;
					const fwd_links = (Object.keys(all_file_links[file_path]) as Array<string>);
					for(const to_node of selected_file_nodes)
					{
						// @ts-ignore
						if(fwd_links.includes(to_node.file))
						{
							const new_edge = this.createEdge(node, to_node);
							edges_data_to_update.push(new_edge);
						}
					}
				}

				all_data.edges = [
					...edges_data_to_update
				];

				canvas.setData(all_data);
				canvas.requestSave();
				new Notice("選択されたファイルノードは"+selected_file_nodes.length+"個です。");
			}
			else {
				new Notice('False');
			}
		});
		// HTMLのクラスを追加する。（多分外部から参照する際に必要になる？）
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}

	onunload() {

	}

	is_active_leaf_canvas = () =>  this.app.workspace.activeLeaf?.view.getViewType() === "canvas"

	createEdge(node1: any, node2: any) {
		const random = (e: number) => {
			let t = [];
			for (let n = 0; n < e; n++) {
				t.push((16 * Math.random() | 0).toString(16));
			}
			return t.join("");
		};

		const edgeData: CanvasEdgeData = {
			id: random(16),
			fromNode: node1.id,
			fromSide: 'right',
			toNode: node2.id,
			toSide: 'left',
		};

		return edgeData;
	}
}