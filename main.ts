

// 選択されたノードのリンク先を取得する。
// 	選択されたノードのリンク先を全て取得すればバックリンクは取得しなくても成立する。
// 取得したファイルノードのリンク先を取得する。
// 取得したノードの既にあるノードリンクを取得する。

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
				console.log(all_file_links);
				for(const node of selected_file_nodes)
				{
					// @ts-ignore
					const file_path:string = node.file
					const fwd_links = (Object.keys(all_file_links[file_path]) as Array<string>);
					console.log(fwd_links);
					new Notice(file_path);
				}
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
}