import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.server.name,
      status: this.server.status,
    });
  }
}
