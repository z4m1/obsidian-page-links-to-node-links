

// 選択されたノードの情報を取得する。

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

				console.log(all_data);
				console.log(selected_data);
				console.log(selected_file_nodes)
				new Notice("選択されたファイルノードは"+selected_file_nodes.length+"個です。");

				if(selected_file_nodes.length <= 0) return;
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
}