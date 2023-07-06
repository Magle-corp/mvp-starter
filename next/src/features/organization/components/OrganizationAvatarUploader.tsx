import { useState } from 'react';
import { AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import Medias from '@/cdn/enums/Medias';
import { UseMutationResult } from '@/cdn/types/Query';
import { avatarConstraints } from '@/features/documents/conf/fileConstraints';
import AvatarUploadDialog from '@/features/documents/components/AvatarUploadDialog';
import Organization from '@/features/organization/types/Organization';
import OrganizationAvatar from '@/features/organization/components/OrganizationAvatar';

type OrganizationAvatarUploader = {
  organization?: Organization;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
  onDelete: Function;
  deleteQuery: UseMutationResult<any>;
} & AvatarProps;

const OrganizationAvatarUploader = (props: OrganizationAvatarUploader) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const DialogOrganizationAvatar = (
    <OrganizationAvatar
      className="tooltip-target"
      data-pr-tooltip="Changer la photo de l'organisation"
      organization={props.organization}
    />
  );

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <OrganizationAvatar
        size="xlarge"
        onClick={() => setDialogOpen(true)}
        className="tooltip-target"
        data-pr-tooltip="Changer la photo de l'organisation"
        organization={props.organization}
      />
      {props.organization?.id && (
        <AvatarUploadDialog
          relatedEntityId={props.organization.id}
          avatar={DialogOrganizationAvatar}
          avatarType={Medias.ORGANIZATION_AVATAR}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          fileConstraints={avatarConstraints}
          onCreate={props.onCreate}
          createQuery={props.createQuery}
          onDelete={props.onDelete}
          deleteQuery={props.deleteQuery}
        />
      )}
    </div>
  );
};

export default OrganizationAvatarUploader;
