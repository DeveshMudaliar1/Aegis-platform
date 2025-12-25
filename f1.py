from graphviz import Digraph

mega_graph = {

"nodes": [


{ "id": "s1", "type": "input", "position": { "x": 0, "y": 150 }, "data": { "label": "Postgres (Main)", "fields": ["id", "raw_payload", "created_at"] }, "style": { "background": "#1e3a8a", "color": "#fff", "border": "1px solid #3b82f6", "width": 180 } },

{ "id": "s2", "type": "input", "position": { "x": 0, "y": 300 }, "data": { "label": "Stripe API", "fields": ["cus_id", "amount", "currency", "status"] }, "style": { "background": "#1e3a8a", "color": "#fff", "border": "1px solid #3b82f6", "width": 180 } },



{ "id": "st1", "position": { "x": 300, "y": 150 }, "data": { "label": "dbt_stg_users", "fields": ["user_id", "id", "email", "is_active"] }, "style": { "background": "#581c87", "color": "#fff", "border": "1px solid #a855f7", "width": 180 } },

{ "id": "st2", "position": { "x": 300, "y": 300 }, "data": { "label": "dbt_stg_payments", "fields": ["payment_id", "cus_id", "usd_amount"] }, "style": { "background": "#581c87", "color": "#fff", "border": "1px solid #a855f7", "width": 180 } },



{ "id": "dw1", "position": { "x": 600, "y": 250 }, "data": { "label": "Fact_Transactions", "fields": ["txn_hash", "id", "usd_amount", "timestamp"] }, "style": { "background": "#1a1a1a", "color": "#fff", "border": "1px solid #333", "width": 200 } },

{ "id": "dw2", "position": { "x": 600, "y": 50 }, "data": { "label": "Dim_User_Profiles", "fields": ["user_id", "email", "tier", "geo"] }, "style": { "background": "#1a1a1a", "color": "#fff", "border": "1px solid #333", "width": 200 } },




{ "id": "c1", "type": "output", "position": { "x": 950, "y": 0 }, "data": { "label": "Rev Dashboard", "fields": ["usd_amount", "tier", "mrr", "arr"] }, "style": { "background": "#1a1a1a", "color": "#fff", "border": "1px solid #333", "width": 180 } },

{ "id": "c2", "type": "output", "position": { "x": 950, "y": 150 }, "data": { "label": "Fraud AI Model", "fields": ["txn_hash", "usd_amount", "risk_score"] }, "style": { "background": "#1a1a1a", "color": "#fff", "border": "1px solid #333", "width": 180 } },

{ "id": "c3", "type": "output", "position": { "x": 950, "y": 300 }, "data": { "label": "Churn Predictor", "fields": ["user_id", "tier", "p_churn"] }, "style": { "background": "#1a1a1a", "color": "#fff", "border": "1px solid #333", "width": 180 } }

],

"edges": [

{ "id": "e1", "source": "s1", "target": "st1", "label": "id", "animated": True },

{ "id": "e2", "source": "s2", "target": "st2", "label": "cus_id", "animated": True },

{ "id": "e3", "source": "st1", "target": "dw2", "label": "email", "animated": True },

{ "id": "e4", "source": "st1", "target": "dw1", "label": "id", "animated": True },

{ "id": "e5", "source": "st2", "target": "dw1", "label": "usd_amount", "animated": True },

{ "id": "e6", "source": "dw2", "target": "c1", "label": "tier", "animated": True },

{ "id": "e7", "source": "dw1", "target": "c1", "label": "usd_amount", "animated": True },

{ "id": "e8", "source": "dw1", "target": "c2", "label": "txn_hash", "animated": True },

{ "id": "e9", "source": "dw2", "target": "c3", "label": "user_id", "animated": True }

]

}

def create_schema_diagram(graph_data, filename="schema_diagram"):
    dot = Digraph(comment='Data Pipeline Schema', format='png')
    dot.attr(rankdir='LR', splines='ortho') 

    for node in graph_data['nodes']:
        node_id = node['id']
        label_title = node['data']['label']
        fields = node['data']['fields']
        

        bg_color = node['style']['background']
        font_color = node['style']['color']

        field_rows = "".join([f'<tr><td align="left" port="{f}">{f}</td></tr>' for f in fields])
        
        html_label = f'''<<table border="0" cellborder="1" cellspacing="0" cellpadding="4">
            <tr><td bgcolor="{bg_color}"><font color="{font_color}"><b>{label_title}</b></font></td></tr>
            {field_rows}
        </table>>'''
        
        dot.node(node_id, label=html_label, shape='none')

    for edge in graph_data['edges']:
        dot.edge(edge['source'], edge['target'], label=edge['label'])

    dot.render(filename, view=True)
    print(f"Diagram generated: {filename}.png")


create_schema_diagram(mega_graph, filename="schema_diagram")
