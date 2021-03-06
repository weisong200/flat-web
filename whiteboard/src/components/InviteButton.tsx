import * as React from "react";
import {Button, Input, message, Popover} from "antd";
import "./InviteButton.less";
import copy from "copy-to-clipboard";
import inviteActive from "../assets/image/invite-active.svg";
import invite from "../assets/image/invite.svg";
import {CopyOutlined} from "@ant-design/icons/lib";
import { Identity } from "../IndexPage";
import { withTranslation, WithTranslation } from 'react-i18next';

export type InviteButtonStates = {
    inviteDisable: boolean;
};

export type InviteButtonProps = {
    uuid: string;
};

class InviteButton extends React.Component<InviteButtonProps & WithTranslation, InviteButtonStates> {
    public constructor(props: InviteButtonProps & WithTranslation) {
        super(props);
        this.state = {
            inviteDisable: false,
        };
    }

    private onVisibleChange = (event: boolean): void => {
        if (event) {
            this.setState({inviteDisable: true});
        } else {
            this.setState({inviteDisable: false});
        }
    }

    private handleInvite = (): void => {
        this.setState({inviteDisable: !this.state.inviteDisable})
    }

    private handleCopy = (): void => {
        const { t } = this.props
        const { uuid } = this.props;
        this.handleInvite();
        copy(`{t('roomNumber')}：${uuid}\n{t('joinLink')}：https://demo.netless.link/whiteboard/${Identity.joiner}/${uuid}/`);
        message.success(t('copyClipboard'));

    }

    private renderInviteContent = (): React.ReactNode => {
        const { t } = this.props
        const {uuid} = this.props;
        const isLocal = location.hostname === "localhost";
        return (
            <div className="invite-box">
                <div className="invite-box-title">
                    {t('inviteJoin')}
                </div>
                <div style={{width: 400, height: 0.5, backgroundColor: "#E7E7E7"}}/>
                <div className="invite-text-box">
                    <div className="invite-url-box" style={{marginBottom: 12}}>
                        <span style={{width: 96}}>{t('roomNumber')}：</span>
                        <Input
                            size={"middle"}
                            value={uuid}
                            addonAfter={
                                <CopyOutlined
                                    onClick={() => {
                                        copy(uuid);
                                        message.success(t('copyUuidMessage'));
                                    }}
                                />
                            }
                        />

                    </div>
                    <div className="invite-url-box">
                        <span style={{width: 96}}>{t('joinLink')}：</span>
                        <Input size={"middle"}
                               value={`${isLocal ? "http" : "https"}://${location.host}/whiteboard/${Identity.joiner}/${uuid}/`}
                               addonAfter={
                                   <CopyOutlined
                                       onClick={() => {
                                           copy(
                                               `${isLocal ? "http" : "https"}://${location.host}/whiteboard/${Identity.joiner}/${uuid}/`,
                                           );
                                           message.success(t('copyClipboard'));
                                       }}
                                   />
                               }/>
                    </div>
                </div>
                <div className="invite-button-box">
                    <Button onClick={this.handleCopy} style={{width: 164, height: 40}} type={"primary"} size={"middle"}>
                        {t('copy')}
                    </Button>
                </div>
            </div>
        );
    }

    public render(): React.ReactNode {
        return (
            <Popover visible={this.state.inviteDisable}
                     trigger="click"
                     onVisibleChange={this.onVisibleChange}
                     content={() => this.renderInviteContent()}
                     placement={"bottomRight"}>
                <div className="page-controller-cell" onClick={this.handleInvite}>
                    <img
                        src={this.state.inviteDisable ? inviteActive : invite}
                        alt={"invite"}/>
                </div>
            </Popover>
        );
    }
}

export default withTranslation()(InviteButton)